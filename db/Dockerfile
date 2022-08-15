FROM mysql:8.0

RUN apt-get update \
  && apt-get -y install locales-all

COPY my.cnf /etc/mysql/conf.d/mysqld_charset.cnf