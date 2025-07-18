import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-video',
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements AfterViewInit {
  showOverlay = true;

  @ViewChild('youtubePlayer', { static: false }) youtubePlayer!: ElementRef<HTMLIFrameElement>;
  private player: any;

  ngAfterViewInit() {
    if (!(window as any)['YT']) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      
      // Créer un tableau de callbacks au lieu d'écraser
      if (!(window as any).youtubeCallbacks) {
        (window as any).youtubeCallbacks = [];
      }
      (window as any).youtubeCallbacks.push(() => this.initPlayer());
      
      (window as any).onYouTubeIframeAPIReady = () => {
        (window as any).youtubeCallbacks.forEach((callback: Function) => callback());
      };
    } else {
      this.initPlayer();
    }
  }

  initPlayer() {
    this.player = new (window as any).YT.Player('youtube-player', {
      events: {
        'onStateChange': (event: any) => this.onPlayerStateChange(event)
      }
    });
  }

  playVideo() {
    if (this.player && this.player.playVideo) {
      this.player.playVideo();
      this.showOverlay = false;
    }
  }

  onPlayerStateChange(event: any) {
    // 2 = paused, 0 = ended
    if (event.data === 2 || event.data === 0) {
      this.showOverlay = true;
    }
    // 1 = playing
    if (event.data === 1) {
      this.showOverlay = false;
    }
  }
}