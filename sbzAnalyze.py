#coding=utf-8

import urllib.request
import re
import math
import threading

class SbzAnalyze():
    '''analyze http://www.sbanzu.com/'''
    
    _basePageUrl = 'http://www.sbanzu.com/boarddisplay.asp?BoardID=8&Page='
    _baseTopicUrl = 'http://www.sbanzu.com/bbs_xml/'
    _pageCount = 10
    _patternPage = 'folderstate[^3][\w\W]*?nowrap>(\d+)\
[\w\W]*?BoardID=8&Page=\d+&TopicID=(\d+)\
">([\w\W]+?)</a>\s\
[\w\W]*?bgcolor="#FFFFFF">(\d+)'
    '''0:click, 1:id, 2:text, 3:reply'''
    _patternTopic = '<ReplyID>(\d+?)</ReplyID>\
<UserName>([\w\W]+?)</UserName>\
<UserID>(\d+?)</UserID>'

    def __init__(self):
        self._topics = {}   #topic dict
        '''key:id
        value[0]:text
        value[1]:click num
        value[2]:reply num
        '''
        self._users = {}    #user dict
        '''key:id
        value[0]:text
        value[1]:topic num
        value[2]:reply num
        '''
        
    def loadPage(self, page):
        url = self._basePageUrl + str(page)
        op = urllib.request.urlopen(url)
        data = op.read().decode('gb18030')
        op.close()
        
        topics = re.findall(self._patternPage, data)
        for t in topics:
            self._topics[int(t[1])] = (t[2], int(t[0]), int(t[3]))
    
    def loadTopic(self, topic):
        folder = math.floor(topic / 5000) + 1
        url = self._baseTopicUrl + str(folder) + '/'  + str(topic) + '.xml'
        op = urllib.request.urlopen(url)
        data = op.read().decode('utf-8')
        op.close()
        
        replies = re.findall(self._patternTopic, data)
        for r in replies:
            user = self.getUser(int(r[2]), r[1])
            if int(r[0]) == 0:
                user[1] += 1
            else:
                user[2] += 1
        
    def analyseData(self):
        #topic click most
        clickMost = sorted(self._topics.items(), key=lambda v:v[1][1], reverse=True)
        clickMost = clickMost[:10]
        print('topic click most')
        for v in clickMost:
            print(v[1][0], v[1][1])

        #topic reply most
        replyMost = sorted(self._topics.items(), key=lambda v:v[1][2], reverse=True)
        replyMost = replyMost[:10]
        print('topic reply most')
        for v in replyMost:
            print(v[1][0], v[1][2])
            
        #user topic most
        topicMost = sorted(self._users.items(), key=lambda v:v[1][1], reverse=True)
        topicMost = topicMost[:10]
        print('user topic most')
        for v in topicMost:
            print(v[1][0], v[1][1]) 
            
        #user reply most
        replyMost = sorted(self._users.items(), key=lambda v:v[1][2], reverse=True)
        replyMost = replyMost[:10]
        print('user reply most')
        for v in replyMost:
            print(v[1][0], v[1][2])
        
    def getUser(self, user, text):
        if not user in self._users:        
            self._users[user] = [text, 0, 0]           
        return self._users[user]
    
    def start(self):
        for i in range(1, self._pageCount+1):
            self.loadPage(i)
        for v in self._topics.keys():
            self.loadTopic(v[0])
        self.analyseData()
    
sbz = SbzAnalyze()
sbz.start()
