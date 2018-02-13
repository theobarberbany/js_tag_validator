import boto
import boto.s3.connection
import falcon
from falcon_cors import CORS
import mimetypes

"""
S3 Signed URL API. Will Guess filetype passed.

Run with gunicorn: $ gunicorn s3_server:api

See https://github.com/theobarberbany/s3_signed_url_server for documentation.

"""

access_key = ''
secret_key = ''
conn = boto.connect_s3(
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    host='cog.sanger.ac.uk',
    # is_secure=False,               # uncomment if you are not using ssl
    calling_format=boto.s3.connection.OrdinaryCallingFormat(),
)

# Allow access via CORS requests.
cors = CORS(allow_origins_list=['http://localhost:3000', 'https://tagcheck.dnapipelines.sanger.ac.uk'],
            allow_headers_list=['Access-Control-Allow-Origin'])


class signS3Upload(object):
    def on_get(self, req, resp):
        """Handles get requests"""
        print("On get method called")
        print("req data is: ", req.params)
        resp.status = falcon.HTTP_200
        resp.media = self.sign_s3_upload(req.params)

    def sign_s3_upload(self, request):
        print("Passed request data: ", request)
        object_name = request['objectName']
        # Guess the MIME type to give to s3
        content_type = mimetypes.guess_type(object_name)[0]
        print(content_type)

        signed_url = conn.generate_url(
            300,
            "PUT",
            'tb15',
            'uploads/' + object_name,
            headers={'Content-Type': content_type}
        )

        return {'signedUrl': signed_url}


api = falcon.API(middleware=[cors.middleware])
api.add_route('/api/S3Sign', signS3Upload())
