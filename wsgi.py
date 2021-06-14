from server.app import app
from server.db import db 
import os
from dotenv import load_dotenv

load_dotenv()

if os.getenv('FLASK_ENV') != 'development':
    db.init_app(app)
    app.run()
else:
    if __name__ == "__main__":
        db.init_app(app)
        app.run(port=5000, debug=True)