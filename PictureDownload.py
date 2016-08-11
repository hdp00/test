#coding=utf-8
'''
网页下图

下载 ‘http://wanimal1983.org/page/中的所有图片’
'''
import urllib.request
import re
import threading
import time
import sqlite3

class PictureDownload():
    _page = 1
    _baseUrl = 'http://wanimal1983.org/page/'
    _code = 'UTF-8'
    _savePath = '/home/hdp/'
    _imageRe = '<img src="(.+?)"\s'
    _nameRe = '.*/(.*\.\w.*)'
    _sql = 'INSERT INTO PICTURENAME (NAME)  VALUES (?)'
    _dbName = 'images.db'
    
    _capacity = 20
    _needThread = True
    _count = 0
    
    def __init__(self):
        self._lock = threading.Lock()
        self._threads = []
        self._saves = {}            #已保存的文件名
        self._newSaves = {}         #最近保存的文件名
        self.initDatabase()
        
    def initDatabase(self):
        with sqlite3.connect(self._dbName) as conn:
            conn.execute('''CREATE TABLE if not exists PICTURENAME (NAME  TEXT    NOT NULL);''')
            cursor = conn.execute("SELECT name  from PICTURENAME")
            for name in cursor:
                self._saves[name[0]] = 0
            
            cursor.close()
        
    def saveDatabase(self):
        with sqlite3.connect(self._dbName) as conn:
            for name in self._newSaves.keys():
                name = (name,)
                conn.execute(self._sql, name)
    
            conn.commit()
    
    def savePicture(self, page):
        '''read page and save pictures'''
        try:
            url = self._baseUrl + str(page)
            op = urllib.request.urlopen(url)
            data = op.read()
            data = data.decode(self._code)
            op.close()
             
            images = re.findall(self._imageRe, data);
            if len(images) <= 1:
                raise Exception('error:no image')
            
            count = 0
            pageSaves = []
            
            for image in images:
                name = re.findall(self._nameRe, image)
                if not name:
                    continue
                name = name[0]
                if name in selsaves:
                    continue
                pageSaves.append(name)
                name = self._savePath + name
                urllib.request.urlretrieve(image, name)
                count += 1
             
            #如果没有可保存的图片   
            if count == 0:
                print('page', str(page), 'all has saved')
                return
                 
            self._lock.acquire()
            self._count += count
            for n in pageSaves:
                self._newSaves[n] = 0
            self._lock.release();
            print('page', str(page), 'save', count)
        except Exception as exc:
            self._lock.acquire()
            self._needThread = False
            self._lock.release();
            print('page', str(page), exc.args)
        
    def createThread(self):
        t = threading.Thread(target=self.savePicture, args=[self._page])
        self._threads.append(t)       
        print('page', str(self._page), 'has created')
        self._page += 1
        t.start()
            
    def start(self):
        self.createThread()
        
        while(self._threads):
            for t in self._threads[:]:
                if not t.is_alive():
                    self._threads.remove(t)
                    print('delete', t.name)
                    
            self._lock.acquire()
            needThread = self._needThread
            self._lock.release()
            if needThread and len(self._threads) < self._capacity:
                self.createThread()
                
            time.sleep(0.2)
            
        self.saveDatabase()
        print(str(self._count), 'was saved')

p = PictureDownload()
p.start()


