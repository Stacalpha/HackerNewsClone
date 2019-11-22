import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const TOP_STORIES_QUERY = gql`
  query {
    hn {
      topStories(limit: 30, offset: 0) {
        by {
          id
        },
        time,
        title,
        url,
        score,
        descendants
      }
    }
  }
`;

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent implements OnInit {

  topStories: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: TOP_STORIES_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(({data}) => {
      this.topStories = data.hn.topStories;
    });
  }
}
