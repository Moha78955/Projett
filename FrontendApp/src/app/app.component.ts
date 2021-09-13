import { Component,ViewChild ,ChangeDetectionStrategy, ChangeDetectorRef,OnDestroy} from '@angular/core';
declare var $: any;
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from './audio-recording.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnDestroy{
title="FrontendApp"
  @ViewChild('videoElement') videoElement: any;
  video: any;
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  audioRecordedTime:any;
  videoRecordedTime:any;
  audioBlobUrl:any;
  videoBlobUrl:any;
  audioBlob:any;
  videoBlob:any;
  audioName:any;
  videoName:any;
  audioStream:any;
  
  audioConf = { audio: true}
  videoConf = { video: { facingMode:"user", width: 320 }, audio: true}

  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingService,
  
    private sanitizer: DomSanitizer
  ) {


    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
 });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.audioRecordedTime = time;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.audioBlob = data.blob;
      this.audioName = data.title;
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
  }



  
  startAudioRecording() {
    if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortAudioRecording() {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopAudioRecording() {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
    }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
  }

  downloadAudioRecordedData() {
    this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
  }

  ngOnDestroy(): void {
    this.abortAudioRecording();
  }

  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    //this.video.srcObject = stream;
    //const url = data;
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
