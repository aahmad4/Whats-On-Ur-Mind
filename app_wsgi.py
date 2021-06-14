from server.main import app
from server.db import db 

from waitress import serve

import os


db.init_app(app)
app.run(host='0.0.0.0', port=int(os.getenv('PORT', 33507))) 