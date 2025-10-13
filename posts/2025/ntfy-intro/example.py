# /// script
# dependencies = [
#     "psutil",
#     "requests",
# ]
# ///

import psutil
import requests
import time

if __name__ == "__main__":
    while True:
        cpu_usage = psutil.cpu_percent(interval=1)
        if cpu_usage > 80:
            message = f"High CPU usage detected: {cpu_usage}%"
            requests.post("https://ntfy.sh/its-my-topic", data=message.encode("utf-8"))
        time.sleep(5)