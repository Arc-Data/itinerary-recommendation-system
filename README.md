### itinerary-recommendation-system
Travel Planning Website with Itinerary Recommendation Capabilities based on tourist spots around Cebu. Built using React + Django.

## Installation Instructions ##

Before proceeding, you must have an appropriate version of Python installed on your computer.

Clone the project into your local folder.

```
git clone https://github.com/Arc-Data/itinerary-recommendation-system.git
```

Create a virtual environment to support appropriate versions in the project root folder.
Type the following in the terminal

```
cd C:/path/to/project/folder
virtualenv env
```

The project root folder should now look like this
```
itinerary-recommendation-system
|- env
|- frontend
|- project
|- README.md
```

Activate the virtual environment by typing this to the terminal and move to the project folder afterwards

```
env/Scripts/activate
cd project
```

Install project backend dependencies and use command pip freeze to confirm you have installed the project dependencies

```
pip install -r requirements.txt
pip freeze
cd ..
```

Change directory into frontend and install frontend dependencies

```
npm install 
```

## Backend MySQL Configuration ##

Make sure you have MySQL installed.

```
CREATE DATABASE irsdb;
USE irsdb;

CREATE USER irsadmin IDENTIFIED BY 'irspass';
GRANT ALL ON irsdb . * TO ‘irsadmin’@’%’;
FLUSH PRIVILEGES;
```

Migrate the models.

```
python manage.py makemigrations
python manage.py migrate
```
