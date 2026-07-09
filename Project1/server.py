from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import json
from urllib.parse import urlparse

class ContactHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == '/api/contact':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
            except json.JSONDecodeError:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'message': 'Invalid request body.'}).encode('utf-8'))
                return

            name = (data.get('name') or '').strip()
            email = (data.get('email') or '').strip()
            subject = (data.get('subject') or '').strip()
            message = (data.get('message') or '').strip()

            if not all([name, email, subject, message]):
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'message': 'Please complete all fields before sending.'}).encode('utf-8'))
                return

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'message': f'Thanks {name}! Your message has been received.'}).encode('utf-8'))
            return

        self.send_response(404)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'message': 'Not found.'}).encode('utf-8'))

    def do_GET(self):
        return super().do_GET()

if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', 8000), ContactHandler)
    print('Serving DecodeLabs at http://localhost:8000')
    server.serve_forever()
