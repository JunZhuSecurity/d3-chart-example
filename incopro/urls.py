from django.conf.urls import patterns, include, url
import index.views as index
import home.views as home
import tree.views as tree
import circle.views as circle
import bubble.views as bubble
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^$', index.index),
    url(r'^home/$', home.home),
    url(r'^tree/$', tree.tree),
    url(r'^bubble/$', bubble.bubble),
    url(r'^circle/$', circle.circle),
    url(r'^api/get-tree-data/$', tree.getData),
]

urlpatterns += staticfiles_urlpatterns()