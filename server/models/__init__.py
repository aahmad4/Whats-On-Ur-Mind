"""
Initial command executed in 'server' directory to create migration directory

pipenv run flask db init --directory server/models/migrations

pipenv run flask db stamp head -d server/models/migrations

pipenv run flask db migrate -d server/models/migrations

pipenv run flask db upgrade -d server/models/migrations
"""
