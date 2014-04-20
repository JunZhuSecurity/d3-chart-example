import json
from django.http import HttpResponse
from django.shortcuts import render
import requests
import sys

def getTweets(request):
    response = requests.get('https://api.twitter.com/1.1/search/tweets.json?q=%23' + request.GET.get('hashtag', 'football') + '&result_type=recent&count=100', headers={"Authorization":"Bearer AAAAAAAAAAAAAAAAAAAAAGmaXAAAAAAAH33QVaszPVJAJRN%2BA9wmR2wtwy0%3DUtI6oP85BqWfKibN4dK6L85YXVF4TDWowdo5pExhtuLcJqei2w"})
    return HttpResponse(response.text, mimetype='application/json')

def twitter(request):
    return render(request, 'twitter.html')