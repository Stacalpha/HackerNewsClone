import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  constructor() { }
  
  @Input() storyData;

  user; time; title; url; score; descendants;
  abbreviatedUrl; storyAge;

  ngOnInit() {
    ({ by: {id: this.user},
      time: this.time,
      title: this.title,
      url: this.url,
      score: this.score,
      descendants: this.descendants,
    } = this.storyData);

    // Trim the url, leaving only the domain name.
    this.abbreviatedUrl = this.url ? this.url
      .split('//')[1] // First remove the 'https://' portion of the url,
      .split('/')[0] // then remove any paths,
      .replace('www.', '') // if it contains 'www.', remove that too.
    : '';

    // Format the time for printing.
    let currentTime = Date.now() / 1000; // Get the current Unix Time (in seconds, Date.now returns millis).
    let storyAgeRaw =  currentTime - this.time; // Get the time difference between current time and upload time.
    let s = 's';

    if (storyAgeRaw < 60) { // Not up to a minute
      let age = storyAgeRaw;
      if (age === 1) s = '';
      this.storyAge = `${age} second${s}`;
    }

    if (storyAgeRaw >= 60) { // Up to 1 minute
      let age = Math.round(storyAgeRaw/60);
      if (age === 1) s = '';
      this.storyAge = `${age} minute${s}`;
    }

    if (storyAgeRaw >= 3600) { // Up to 1 hour
      let age = Math.round(storyAgeRaw/3600);
      if (age === 1) s = '';
      this.storyAge = `${age} hour${s}`;
    }
  }
}
