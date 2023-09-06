```
docker build . -t ctnelson1997/cs571-f23-web-client
docker push ctnelson1997/cs571-f23-web-client
```

```
docker pull ctnelson1997/cs571-f23-web-client
docker run -dit --name cs571_f23_web_client -p 51667:80 ctnelson1997/cs571-f23-web-client
```