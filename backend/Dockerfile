# Dockerfile
FROM python:3.9-slim-buster

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
RUN apt-get update \
    && apt-get install -y gcc python3-dev musl-dev

# Set the work directory
WORKDIR /code

# Copy the current directory contents into the container at /code
ADD . /code/

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
