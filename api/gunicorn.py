import os

bind = f"0.0.0.0:{str(os.getenv('PORT', 3000))}"
workers = 2