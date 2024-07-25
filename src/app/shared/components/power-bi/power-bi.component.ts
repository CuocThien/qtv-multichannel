import { Component, OnInit } from '@angular/core';
import * as pbi from 'powerbi-client';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-power-bi',
  templateUrl: './power-bi.component.html',
  styleUrls: ['./power-bi.component.scss'],
})
export class PowerBiComponent implements OnInit {
  private accessToken: string | undefined;

  private REPORT_ID = '2c9c0a91-b55c-42c0-8d23-c903612e5a39';
  private GROUP_ID = '2dff09ac-2b3b-4182-9953-2b548e0d0b39';
  constructor(private msalService: MsalService, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.msalService.instance.initialize();

      const activeAccount = this.msalService.instance.getActiveAccount();
      if (!activeAccount) {
        const allAccounts = this.msalService.instance.getAllAccounts();
        if (allAccounts.length > 0) {
          this.msalService.instance.setActiveAccount(allAccounts[0]);
        } else {
          await this.msalService
            .loginPopup()
            .toPromise()
            .then((response: any) => {
              this.msalService.instance.setActiveAccount(response.account);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }

      // Proceed with your token acquisition
      const token = await this.msalService.instance.acquireTokenSilent({
        // scopes: ['https://analysis.windows.net/powerbi/api/.default'],
        scopes: ['user.read'],
      });
      console.log(token);
      this.accessToken = token.accessToken;
      this.embedPowerBiReport();
    } catch (error) {
      console.error('Error acquiring token silently: ', error);
    }
    // this.authService.instance
    //   .acquireTokenSilent({
    //     scopes: ['https://analysis.windows.net/powerbi/api/.default'],
    //   })
    //   .then((response) => {
    //     console.log('🐼 => PowerBiComponent => response:', response);
    //     this.accessToken = response.accessToken;
    //     this.embedPowerBiReport();
    //   })
    //   .catch((error) => {
    //     console.error('Error acquiring token silently', error);
    //   });
  }

  embedPowerBiReport(): void {
    const embedConfig = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken: this.accessToken,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${this.REPORT_ID}&groupId=${this.GROUP_ID}`,
      id: this.REPORT_ID,
      permissions: pbi.models.Permissions.All,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
      },
    };

    const powerbiService = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory,
    );

    const embedContainer = document.getElementById('embedContainer');
    if (!isEmpty(embedContainer)) {
      powerbiService.embed(embedContainer, embedConfig);
    }
  }
}
