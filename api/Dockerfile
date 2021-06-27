FROM python:3.9-alpine
WORKDIR /tmp
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
WORKDIR /app
COPY main.py main.py
COPY tracklists_0610.db tracklists_0610.db
CMD ["gunicorn", "main:app", "-c" "gunicorn.py"]