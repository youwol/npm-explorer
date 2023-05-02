import { TopBannerView as TopBannerViewBase } from '@youwol/os-top-banner'

import { AppState } from './app.state'

export class TopBannerView extends TopBannerViewBase {
    constructor(params: { appState: AppState }) {
        super({
            innerView: {
                class: 'd-flex w-100 justify-content-center my-auto align-items-center',
                children: [
                    {
                        class: 'w-50 d-flex align-items-center mx-auto fv-text-primary',
                        children: [
                            {
                                class: 'd-flex align-items-center p-2 w-100 fv-text-primary',
                                style: {
                                    backgroundColor: '#f2f2f2',
                                },
                                children: [
                                    {
                                        class: 'fas fa-search fv-text-background',
                                    },
                                    {
                                        style: {
                                            background: 'none',
                                            fontFamily:
                                                "'Fira Mono', 'Andale Mono', 'Consolas', monospace",
                                            fontSize: '16px',
                                            letterSpacing: '0px',
                                            border: 'none',
                                            outline: 'unset',
                                            height: '25px',
                                            paddingLeft: '10px',
                                            borderRadius: '0',
                                        },
                                        class: 'flex-grow-1',
                                        tag: 'input',
                                        type: 'text',
                                        placeholder: 'Search packages',
                                        onchange: (ev) => {
                                            params.appState.search(
                                                ev.target.value,
                                            )
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        })
    }
}
