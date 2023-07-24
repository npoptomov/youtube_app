# Custom Youtube API and YouTube Analytics Dashboard

This repository contains both front-end and back-end applications.

## Backend

The backend application is a Django REST API app. It utilizes PostgreSQL as its database and has a QCluster service. 

### Getting Started

#### Prerequisites

- PostgreSQL server up and running.
- Python 3.7 or higher

#### Configuration

1. Update your PostgreSQL database configurations in `settings.py`.

#### Installation

1. Inside the backend folder, install the required Python packages.

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Apply migrations, Start the Django server and QCluster service.

   ```bash
   python manage.py migrate
   python manage.py runserver
   python manage.py qcluster
   ```

3. Create a Django superuser to be able to access the front-end.

   ```bash
   python manage.py createsuperuser
   ```

The backend application will start on `localhost:8000`.

For API reference, see the Postman collection `Youtube Custom API.postman_collection.json` in the backend folder which illustrates the endpoints and example JSON responses.

#### Docker Installation

You can also run the backend application using Docker.

1. Build and start the containers using Docker Compose.

   ```bash
   docker-compose up --build -d
   ```

2. After starting the containers, you will need to create a Django superuser to be able to log into the front-end app.

   ```bash
   docker exec -it <container_id> python manage.py createsuperuser
   ```

## Frontend

The frontend application can be run using npm.

### Getting Started

#### Prerequisites

- Node.js
- npm

#### Installation

1. Inside the frontend folder, install the required packages.

   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend server.

   ```bash
   npm start
   ```

The frontend application will start on `localhost:3000`.

## Author

- Nikola Pop Tomov

## License

This project is licensed under the MIT License.
