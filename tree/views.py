import json
from django.http import HttpResponse
from django.shortcuts import render

def getData(request):

    treeData = {
       'some_var_1': 'foo',
       'some_var_2': 'bar',
    }

    data = json.dumps(treeData)

    return HttpResponse(data, mimetype='application/json')

def tree(request):
    return render(request, 'tree.html', {'msg': 'Welcome to my Django Site!'})