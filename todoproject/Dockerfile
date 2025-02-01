# Use Python as base image
FROM python:3.12

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set working directory inside the container
WORKDIR /app

# Copy project files
COPY . /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Collect static files (includes frontend build)
RUN python manage.py collectstatic --noinput

# Expose port (only needed for local testing)
EXPOSE 8000

# Run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
