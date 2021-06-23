from server.main import app
from server.db import db

import os

db.init_app(app)

if __name__ == "__main__":
    app.run(port=int(os.getenv('PORT', 5000)))
