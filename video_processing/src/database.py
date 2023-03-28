#!/usr/bin/env python
# coding: utf-8

from sqlalchemy import create_engine, select, MetaData, Table, Column, Integer, Time
import pandas as pd
import os


class DataBase:
    def __init__(self):

        db_string = "postgres://goland:goland@%s:5432/hm?sslmode=disable"
        
        self.engine = create_engine(db_string)
        # connection = self.engine.connect()
        self.meta = MetaData()

    def get_new_films(self):
        with self.engine.connect().execution_options(autocommit=True) as conn:
            
            sql_string = """SELECT * 
                     FROM films
                     WHERE status=0
                    """
            df_films = pd.read_sql(sql_string, con=conn)
            
        return df_films

    def add_new_rows(self, df):
        with self.engine.connect().execution_options(autocommit=True) as conn:
            df.to_sql('film_info', con=conn, index=False, if_exists='append')

