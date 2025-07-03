from locust import HttpUser, task, between
import json
import base64

class UserBehavior(HttpUser):
    wait_time = between(1, 3)  # Time between requests to simulate user behavior

    def on_start(self):
        # Using environment runner to generate a unique user ID
        self.user_id = f"user{self.environment.runner.user_count}"

    # Endpoint: /favorite (add song to favorites)
    @task(1)
    def favorite(self):
        data = {
            "user_id": self.user_id,
            "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
        self.client.post("/favorite", json=data)

    # Endpoint: /get_favorites (get the list of favorites)
    @task(2)
    def get_favorites(self):
        self.client.get(f"/get_favorites/{self.user_id}")

    # Endpoint: /predict_emotion (simulate sending an image for emotion prediction)
    @task(3)
    def predict_emotion(self):
        # For this, you will need an actual image base64 encoded or mock one
        image_data = self.get_mock_image_base64()
        data = {
            "image": image_data
        }
        self.client.post("/predict_emotion", json=data)

    def get_mock_image_base64(self):
        # This function returns a dummy image encoded in base64.
        # You can replace it with an actual image base64 string or a mock
        # for testing purposes.
        with open("dummy_face.jpg", "rb") as img_file:
            return base64.b64encode(img_file.read()).decode('utf-8')
