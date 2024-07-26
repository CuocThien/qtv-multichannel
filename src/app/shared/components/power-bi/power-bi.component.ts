import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { isElement, isEmpty } from 'lodash';

@Component({
  selector: 'app-power-bi',
  templateUrl: './power-bi.component.html',
  styleUrls: ['./power-bi.component.scss'],
})
export class PowerBiComponent {}
// export class PowerBiComponent implements OnInit {
//   accessToken =
//     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMmRmZjA5YWMtMmIzYi00MTgyLTk5NTMtMmI1NDhlMGQwYjM5LyIsImlhdCI6MTcyMTkyMzk3OCwibmJmIjoxNzIxOTIzOTc4LCJleHAiOjE3MjE5Mjc4NzgsImFpbyI6IkUyZGdZTGlRR3hrYW4xcWp5SFZOUS96QzRxZnVBQT09IiwiYXBwaWQiOiIyNDk2YmEzMi0zMWM5LTQxZmItOTI1OS01OWM2MGRlYmNmYzMiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yZGZmMDlhYy0yYjNiLTQxODItOTk1My0yYjU0OGUwZDBiMzkvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI4ZGMzZGUxNC1hN2VmLTRlOGUtYjg3YS04MGM5ZmVkOWQzZGMiLCJyaCI6IjAuQVZRQXJBbl9MVHNyZ2tHWlV5dFVqZzBMT1FrQUFBQUFBQUFBd0FBQUFBQUFBQUNpQUFBLiIsInN1YiI6IjhkYzNkZTE0LWE3ZWYtNGU4ZS1iODdhLTgwYzlmZWQ5ZDNkYyIsInRpZCI6IjJkZmYwOWFjLTJiM2ItNDE4Mi05OTUzLTJiNTQ4ZTBkMGIzOSIsInV0aSI6Ijgxb0pKTzFIMmtpWU1waXlJWi1IQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfaWRyZWwiOiI3IDIifQ.Mvph1R5_8QB5W3NQ9Vgme7CaIn_PWmfC7oEGtufooNrWA9yEKWsOpunpQdfDFGiIJF8cVGNuYcYxUJDDfMnjb4S8nkLmKPM7smHN2MrUpeZdkpcDFBJJ-jyEzCtPKemANHY7O9PKseVDyqNXaGfNd3cCwDMMy6el6rL704BCYcurT0Bq-flhfTh9N4pcilrnPvEdaaHXHybOh1J3vk7dPh_JaBVKBC_JEuANK66gLvKkp9r8CGECvRP_b7ZE0H2nuBlHwtbEhS3QQlT3JU8NhjIUdtXDK7LNnJFfYUsAf-WfeGzYEJFZ5Ur6KfzheiyEMouk35QL0J2pTnyQRYABNg';
//   reportGroupId = '334db238-e939-49f7-84bd-20165bcc8999';
//   reportId = '48f77d18-775b-4927-be45-8affb351af3f';
//   embedUrl = `https://app.powerbi.com/reportEmbed?reportId=${this.reportId}&groupId=${this.reportGroupId}&access_token=${this.accessToken}`;
//   sanitizer!: DomSanitizer;
//   constructor(sanitizer: DomSanitizer) {
//     this.sanitizer = sanitizer;
//   }
//   ngOnInit(): void {
//     this.embedUrl = ``;
//   }
// }
// export class PowerBiComponent implements OnInit {
//   embedUrl: string =
//     'https://app.powerbi.com/reportEmbed?reportId=48f77d18-775b-4927-be45-8affb351af3f';
//   // 'https://app.powerbi.com/reportEmbed?reportId=48f77d18-775b-4927-be45-8affb351af3f&autoAuth=true&ctid=2dff09ac-2b3b-4182-9953-2b548e0d0b39';
//   accessToken: string =
//     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMmRmZjA5YWMtMmIzYi00MTgyLTk5NTMtMmI1NDhlMGQwYjM5LyIsImlhdCI6MTcyMTkyMzk3OCwibmJmIjoxNzIxOTIzOTc4LCJleHAiOjE3MjE5Mjc4NzgsImFpbyI6IkUyZGdZTGlRR3hrYW4xcWp5SFZOUS96QzRxZnVBQT09IiwiYXBwaWQiOiIyNDk2YmEzMi0zMWM5LTQxZmItOTI1OS01OWM2MGRlYmNmYzMiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yZGZmMDlhYy0yYjNiLTQxODItOTk1My0yYjU0OGUwZDBiMzkvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI4ZGMzZGUxNC1hN2VmLTRlOGUtYjg3YS04MGM5ZmVkOWQzZGMiLCJyaCI6IjAuQVZRQXJBbl9MVHNyZ2tHWlV5dFVqZzBMT1FrQUFBQUFBQUFBd0FBQUFBQUFBQUNpQUFBLiIsInN1YiI6IjhkYzNkZTE0LWE3ZWYtNGU4ZS1iODdhLTgwYzlmZWQ5ZDNkYyIsInRpZCI6IjJkZmYwOWFjLTJiM2ItNDE4Mi05OTUzLTJiNTQ4ZTBkMGIzOSIsInV0aSI6Ijgxb0pKTzFIMmtpWU1waXlJWi1IQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfaWRyZWwiOiI3IDIifQ.Mvph1R5_8QB5W3NQ9Vgme7CaIn_PWmfC7oEGtufooNrWA9yEKWsOpunpQdfDFGiIJF8cVGNuYcYxUJDDfMnjb4S8nkLmKPM7smHN2MrUpeZdkpcDFBJJ-jyEzCtPKemANHY7O9PKseVDyqNXaGfNd3cCwDMMy6el6rL704BCYcurT0Bq-flhfTh9N4pcilrnPvEdaaHXHybOh1J3vk7dPh_JaBVKBC_JEuANK66gLvKkp9r8CGECvRP_b7ZE0H2nuBlHwtbEhS3QQlT3JU8NhjIUdtXDK7LNnJFfYUsAf-WfeGzYEJFZ5Ur6KfzheiyEMouk35QL0J2pTnyQRYABNg';
//   embedConfig: any = {};

//   embedPowerBI(): void {
//     this.embedConfig = {
//       type: 'report',
//       tokenType: 1,
//       accessToken: this.accessToken,
//       embedUrl: this.embedUrl,
//       settings: {
//         filterPaneEnabled: false,
//         navContentPaneEnabled: false,
//       },
//     };
//   }

//   ngOnInit(): void {
//     // this.updateIframeSrc();
//     this.embedPowerBI();
//     const reportContainer = document.getElementById('reportContainer');
//     if (reportContainer) {
//       const powerbi = (window as any).powerbi;
//       powerbi.embed(reportContainer, this.embedConfig);
//     }
//   }

//   // updateIframeSrc(): void {
//   //   const iframe = document.getElementById(
//   //     'powerbi-iframe',
//   //   ) as HTMLIFrameElement;
//   //   iframe.src = `${this.embedUrl}&access_token=${this.accessToken}`;
//   // }
// }
