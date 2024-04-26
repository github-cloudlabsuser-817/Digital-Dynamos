import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class AudioService {
    audio: MediaObject;
    recording: boolean = false;
    filePath: string;
    timer: number = 0;
    timerInterval: any;

    constructor(
        private media: Media,
        private platform: Platform
    ) { }

    getDirectory = async () => {
        try {
            const result = await Filesystem.getUri({
                directory: this.platform.is('ios') ? Directory.Documents : Directory.External,
                path: ''
            });
            console.log('Document Directory:', result.uri);
            return result.uri;
        } catch (error) {
            console.error('Error getting document directory:', error);
        }
    };

    async startRecording() {
        let directory = await this.getDirectory();
        this.filePath = directory + '/recording' + this.getExtension();
        console.log("File path -> ", this.filePath);
        this.audio = this.media.create(this.filePath);
        this.audio.startRecord();
        this.recording = true;
        this.startTimer();
    }

    stopRecording() {
        this.audio.stopRecord();
        this.recording = false;
        this.stopTimer();
    }

    startTimer() {
        // Start the timer when recording starts
        this.timerInterval = setInterval(() => {
            this.timer++;
        }, 1000); // Update the timer every second (1000ms)
    }

    stopTimer() {
        // Stop the timer when recording stops
        clearInterval(this.timerInterval);
        this.timer = 0; // Reset timer
    }

    play(pos) {
        // this.audio.seekTo(pos * 1000);
        this.audio.play();
    }

    async pause(): Promise<number> {
        let pos = await this.audio.getCurrentPosition();
        console.log("******** post on pause *********", pos);
        this.audio.pause();
        return pos;
    }

    stop() {
        this.audio.stop();
    }

    getPlayer() {
        return this.audio;
    }

    getFormattedTimer(): string {
        const hours = Math.floor(this.timer / 3600);
        const minutes = Math.floor((this.timer % 3600) / 60);
        const seconds = this.timer % 60;
        return `${this.padWithZero(hours)}:${this.padWithZero(minutes)}:${this.padWithZero(seconds)}`;
    }
    
    private padWithZero(value: number): string {
        return value < 10 ? '0' + value : value.toString();
    }

    getExtension() {
        return this.platform.is('ios') ? '.m4a' : '.m4a';
    }
    getMimeType() {
        return this.platform.is('ios') ? 'audio/wav' : 'audio/wav';
    }

    convertMediaFileToBlob(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const contents: any = await Filesystem.readFile({
                path: this.filePath
            });
            console.log('data:', contents.data);
            const audioBlob = this.b64toBlob(contents.data, this.getMimeType());
            audioBlob['lastModifiedDate'] = new Date();
            audioBlob['name'] = 'recording' + this.getExtension();
            const formData = new FormData();
            formData.append('file', audioBlob as Blob, 'recording' + this.getExtension());
            resolve(formData);
        });
    }

    b64toBlob(b64Data: string, contentType: string) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }
}
