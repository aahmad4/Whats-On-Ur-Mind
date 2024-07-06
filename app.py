from server.main import app
from server.db import db
from server.db import migrate

import os

db.init_app(app)
migrate.init_app(app, db)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(port=int(os.getenv('PORT', 5000)), debug=True)
