from server.main import app
from server.db import db 

import os

if __name__ == "__main__":
    db.init_app(app)
    app.run(port=int(os.getenv('PORT', 33507))) 