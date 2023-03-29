#!/usr/bin/env python
# coding: utf-8

import datetime
import pandas as pd
from videomarker import VideoMarker
from database import DataBase
import time

if __name__ == '__main__':
    print('Video processing started started')
    db = DataBase()

    while True:
        
        df = db.get_new_films()
        for i in range(len(df)):
            
            film_info = df.iloc[i]
            print('Process: ' + film_info.file)
            flicks, reds = VideoMarker(film_info.file)
            output = []
            for time_parts in flicks:
                output.append([film_info[0], 0, 'flick',  time_parts[0], time_parts[1]])
                
            for time_parts in reds:
                output.append([film_info[0], 1, 'red',  time_parts[0], time_parts[1]])
            print(film_info.file+ ' processed.')  
            
        df_output = pd.DataFrame(output, columns = ['film_id', 'type', 'value', 'start_time', 'end_time']).reset_index()
        # запись в БД
        db.add_new_rows(df_output)
        time.sleep(5 * 60) 

