# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app
ENV PYTHONUNBUFFERED=1

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code
COPY . .

# Expose the port Flask runs on
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]