from server.main import app
from server.db import db 

from waitress import serve

import os
from dotenv import load_dotenv

load_dotenv()

if os.getenv('FLASK_ENV') != 'development':
    db.init_app(app)
    serve(app, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
else:
    db.init_app(app)
    app.run(port=5000, debug=True) 