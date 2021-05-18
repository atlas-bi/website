from flask_frozen import Freezer

import web

freezer = Freezer(web.create_app())

if __name__ == "__main__":
    freezer.freeze()
    # freezer.run(debug=True)
