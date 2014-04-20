from django.conf.urls import patterns, include, url
import index.views as index
import home.views as home
import tree.views as tree
import pie.views as pie
import bubble.views as bubble
import twitter.views as twitter
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^$', index.index),
    url(r'^home/$', home.home),
    url(r'^tree/$', tree.tree),
    url(r'^bubble/$', bubble.bubble),
    url(r'^pie/$', pie.pie),
    url(r'^api/get-tree-data/$', tree.getData),
    url(r'^api/get-tweets/$', twitter.getTweets),
]

urlpatterns += staticfiles_urlpatterns()