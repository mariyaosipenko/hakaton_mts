#!/usr/bin/env python
# coding: utf-8

import cv2
import numpy as np


class VideoMarker():
    
    def _frame_count2timeline(self, flicks, fps):
        start = -1
        end = -1
        flick_times = []
        
        #пfirst step: frames 2 sec
        for i in range(len(flicks)):
            if flicks[i] == 1 and start == -1:
                start = i
            if flicks[i] == 0 and start > -1:
                flick_times.append([start/fps, (i-1)/fps])
                start = -1
        if start > -1:
            flick_times.append([start/fps, len(flicks)/fps])
            
        #second step: merge frames if gap less than 0.25 sec
        flick_times_joined = []
        start = flick_times[0][0]
        end = flick_times[0][1]
        for i in range(len(flick_times)-1):
            end_0 = flick_times[i][1]
            start_1 = flick_times[i+1][0]

            if start_1 - end_0 > 0.5:
                flick_times_joined.append([start, end])
                start = start_1
            end = flick_times[i+1][1]
        if flick_times[-1][1] > flick_times_joined[-1][1]:
            flick_times_joined[-1][1] = flick_times[-1][1]
        return flick_times_joined
    
    def _is_red(self, frame):
        YCrCb = cv2.cvtColor(frame, cv2.COLOR_BGR2YCR_CB)
        y = (((YCrCb[:, :, 0] > 66).astype(int) + (YCrCb[:, :, 0] < 104).astype(int)) > 1).astype(int)
        cr = (((YCrCb[:, :, 1] > 218).astype(int) + (YCrCb[:, :, 1] < 255).astype(int)) > 1).astype(int)
        cb = (((YCrCb[:, :, 2] > 72).astype(int) + (YCrCb[:, :, 2] < 110).astype(int)) > 1).astype(int)
        if (((y+cr+cb) > 2).sum()/frame.shape[0]*frame.shape[1]) > 0.25:
            return 1
        return 0
    
    def mark(self, video_path):
        
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        n_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
        #gev: read and process first frame 
        ret, frame = cap.read()
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame_lum = frame_rgb[:,:,0]*0.299 +(0.587 * frame_rgb[:,:,1]) + (.114 * frame_rgb[:,:,2])
        mask = np.zeros(frame_lum.shape)
        flicks, reds, averages = [0], [0], [0]

        frame_count = 1
        start = 0
        flicked = False
        
        #processing all frames after firsr
        for i in range(int(n_frames)-1):
            ret, frame2 = cap.read()

            if ret:
                reds.append(self._is_red(frame2))
                frame_rgb_2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2RGB)
                frame_lum_2 = frame_rgb_2[:,:,0]*0.299 +(0.587 * frame_rgb_2[:,:,1]) + (.114 * frame_rgb_2[:,:,2])
                diff = frame_lum_2.astype(float)-frame_lum.astype(float)
                threshold = (np.max(frame_lum_2) - np.min(frame_lum_2))/10
                is_flick = 0
                
                average = np.mean(abs(diff))                
                if average > 1: 
                    is_flick = 1
                    
                mask = (mask + (abs(diff) > threshold)) > 0   
                f = mask.sum()/(diff.shape[0]*diff.shape[1])
                
                averages.append(average)
                flicks.append(is_flick)
                frame_count+=1
                
                if f > 0.25:
                    end = frame_count
                    if end-start > 20: 
                        for j in range(start, end-1):
                            flicks[j] = 0
                    mask = (abs(diff) > threshold) > 0
                    start = frame_count+1

                frame_lum = frame_lum_2
            else:
                break
                
        flicks = self._frame_count2timeline(flicks, fps)
        reds = self._frame_count2timeline(reds, fps)
        return flicks, reds




