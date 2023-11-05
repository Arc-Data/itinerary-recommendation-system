import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        return self.create_user(email, password, **extra_fields)
    
class RecommendationsManager():
    def get_content_recommendations(self, user_preferences):

        itinerary = pd.read_csv('itineraries.csv')

        # min-max values of tags
        min_value = 0
        max_value = 5

        # data cleanup
        itinerary.drop(itinerary.columns[itinerary.columns.str.contains('unnamed',case = False)],axis = 1, inplace = True)
        itinerary = itinerary.drop(['Context', 'link to itinerary'], axis=1)

        # prepare labels for normalized data
        spot_columns = ['Spot1', 'Spot2', 'Spot3', 'Spot4', 'Spot5']
        tag_columns = ['Historical', 'Nature', 'Religious', 'Art', 'Activities','Entertainment','Culture']

        # prepare normalized dataframe
        normalized_data = [
            {
                'id': row['ItineraryID'],
                'spots': [row[col] for col in spot_columns if not pd.isna(row[col])],
                'tags': [(row[col] - min_value) / (max_value - min_value) for col in tag_columns if not pd.isna(row[col])]
            }
            for _, row in itinerary.iterrows()
        ]
        normalized_data = pd.DataFrame(normalized_data)

        # Recommendation portion
        user_vector = np.array(user_preferences, dtype=int)
        dimension = len(user_vector)
        
        def calculate_cosine_similarity(row):
            itinerary_vector = row['tags'] + [0] * (dimension - len(row['tags']))
            cosine_similarity_score = np.dot(user_vector, itinerary_vector) / (np.linalg.norm(user_vector) * np.linalg.norm(itinerary_vector))
            return cosine_similarity_score

        normalized_data['similarity'] = normalized_data.apply(calculate_cosine_similarity, axis=1)

        #sort recommendations by descending & limit 
        limit = 5
        recommended_itineraries = normalized_data.sort_values(by='similarity', ascending=False)
        recommended_itineraries = recommended_itineraries.head(limit)
        recommended_itineraries = recommended_itineraries.sample(frac=1).reset_index(drop=True)

        # display recommendations
        # print(f"Recommended Itineraries:")
        # print(recommended_itineraries[['id', 'spots', 'similarity']])

        recommended_itineraries.head()
        top_3_ids = recommended_itineraries.head(3)['id'].tolist()

        return top_3_ids
    
    def get_hybrid_recommendations(self):
        return None