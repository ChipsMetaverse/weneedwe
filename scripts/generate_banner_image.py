#!/usr/bin/env python3
import requests
import time
import os
import json
from dotenv import load_dotenv
from PIL import Image
import io

# Load environment variables from .env file
load_dotenv()

# API configurations
API_KEY = os.getenv('AGENTQL_API_KEY')  # This is the BFL API key

def generate_image(prompt, width=1920, height=600):
    """
    Generate an image using the BFL FLUX API
    """
    # Step 1: Submit the image generation request
    print("Submitting image generation request...")
    
    request_url = 'https://api.us1.bfl.ai/v1/flux-pro-1.1'
    headers = {
        'accept': 'application/json',
        'x-key': API_KEY,
        'Content-Type': 'application/json'
    }
    
    payload = {
        'prompt': prompt,
        'width': width,
        'height': height,
        'negative_prompt': "blurry, distorted, deformed features, unrealistic proportions, extra fingers"
    }
    
    try:
        response = requests.post(request_url, headers=headers, json=payload)
        response.raise_for_status()
        request_data = response.json()
        
        print(f"Request submitted: {json.dumps(request_data, indent=2)}")
        
        if 'id' not in request_data:
            print("Error: No request ID returned")
            return None
            
        request_id = request_data['id']
        print(f"Request ID: {request_id}")
        
        # Step 2: Poll for the result
        print("Polling for result...")
        result_url = 'https://api.us1.bfl.ai/v1/get_result'
        
        max_attempts = 30
        for attempt in range(max_attempts):
            time.sleep(2)  # Wait between polls
            
            result_response = requests.get(
                result_url,
                headers={
                    'accept': 'application/json',
                    'x-key': API_KEY
                },
                params={'id': request_id}
            )
            
            result_response.raise_for_status()
            result_data = result_response.json()
            
            print(f"Status: {result_data.get('status')} (attempt {attempt+1}/{max_attempts})")
            
            if result_data.get('status') == 'Ready':
                # Get the image URL
                image_url = result_data.get('result', {}).get('sample')
                if not image_url:
                    print("Error: No image URL in result")
                    return None
                    
                print(f"Image generated! URL: {image_url}")
                
                # Download the image
                image_response = requests.get(image_url)
                image_response.raise_for_status()
                return image_response.content
                
            elif result_data.get('status') == 'Error':
                print(f"Error generating image: {result_data.get('error')}")
                return None
                
        print("Timed out waiting for image generation")
        return None
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

def save_image(image_data, output_path):
    """Save image data to a file"""
    if image_data:
        with open(output_path, "wb") as f:
            f.write(image_data)
        print(f"Image saved to {output_path}")
        
        # Display image dimensions
        img = Image.open(io.BytesIO(image_data))
        print(f"Image dimensions: {img.width}x{img.height}")
        return True
    return False

if __name__ == "__main__":
    # Define the prompt for a wide-format banner image
    prompt = """
    A professional, serious photograph of a young Black woman with long dreadlocks 
    holding up a red card with white 'HIV' text on it. She is wearing a denim jacket 
    and standing outdoors in a park with blurred green trees and buildings in the background. 
    The woman has a thoughtful, determined expression. This is for a health awareness website banner.
    High quality, photorealistic, high resolution, clear focus on subject, wide-format banner composition.
    """
    
    # Define output paths
    output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "images")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "HivResourcesBanner_new.jpg")
    
    # Generate and save the image
    image_data = generate_image(prompt)
    if save_image(image_data, output_path):
        print(f"\nImage successfully generated and saved to {output_path}")
        print(f"\nTo use this image, update your ResourceCenter.tsx file with:")
        print(f"src=\"/images/HivResourcesBanner_new.jpg\"")
    else:
        print("Failed to generate and save image")
