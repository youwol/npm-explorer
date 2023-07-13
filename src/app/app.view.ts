import { VirtualDOM, children$, child$ } from '@youwol/flux-view'
import { NpmPackageResponse } from './npm.models'
import { AssetsGateway } from '@youwol/http-clients'
import { onHTTPErrors } from '@youwol/http-primitives'
import { AppState } from './app.state'
import { TopBannerView } from './top-banner.view'

export class AppView implements VirtualDOM {
    public readonly appState = new AppState()
    public readonly class =
        'w-100 flex-grow-1 d-flex flex-column fv-text-primary fv-bg-background'
    public readonly style = {
        minHeight: '0px',
        fontFamily: 'Lexend, sans-serif',
    }
    public readonly children: VirtualDOM[]

    constructor() {
        this.children = [
            new TopBannerView({ appState: this.appState }),
            new ResultsView({ appState: this.appState }),
        ]
    }
}

export class ResultsView implements VirtualDOM {
    public readonly class = 'w-100 flex-grow-1 overflow-auto px-2'

    public readonly appState: AppState
    public readonly children: VirtualDOM

    constructor(params: { appState: AppState }) {
        Object.assign(this, params)
        this.children = [
            {
                class: 'mx-auto',
                style: {
                    maxWidth: '800px',
                },
                children: children$(this.appState.packages$, (response) => {
                    return response.objects.map(
                        (item) => new PackageView(item.package),
                    )
                }),
            },
        ]
    }
}

export class PackageView implements VirtualDOM {
    public readonly class = 'fv-border-bottom-disabled py-4'
    public readonly children: VirtualDOM[]

    constructor(params: NpmPackageResponse) {
        const client = new AssetsGateway.Client()
        this.children = [
            {
                class: 'd-flex align-items-center',
                children: [
                    {
                        style: { fontSize: '1.25rem', fontWeight: 'bolder' },
                        innerText: params.name,
                    },
                    { class: 'mx-2' },
                    {
                        style: { fontSize: '1.25rem', weight: 'bolder' },
                        innerText: params.version,
                    },
                    { class: 'flex-grow-1' },
                ],
            },
            {
                innerText: params.description,
            },
            child$(
                client.cdn
                    .getLibraryInfo$({
                        libraryId: window.btoa(params.name),
                    })
                    .pipe(onHTTPErrors((_error) => undefined)),
                (info) => {
                    if (info == undefined) {
                        return new PackageNotAvailableView()
                    }
                    if (info.versions[0] != params.version) {
                        console.log(info.versions[0], params.version)
                        return new UpgradeAvailableView({
                            latest: info.versions[0],
                        })
                    }
                    return new VersionAvailableView()
                },
                { untilFirst: { class: 'fas fa-spinner fa-spin' } },
            ),
        ]
    }
}

class VersionAvailableView {
    public readonly class =
        'border p-2 d-flex align-items-center fv-text-success  fv-pointer'
    public readonly style = {
        width: 'fit-content',
    }
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                class: 'fas fa-check',
            },
            { class: 'mx-2' },
            {
                innerText: 'Version available',
            },
        ]
    }
}
class UpgradeAvailableView {
    public readonly class = 'border p-2 d-flex align-items-center  fv-pointer'
    public readonly style = {
        width: 'fit-content',
    }
    public readonly children: VirtualDOM[]
    constructor(params: { latest }) {
        this.children = [
            {
                class: 'fas fa-cloud-upload-alt',
            },
            { class: 'mx-2' },
            {
                innerText: `Request publication (latest: ${params.latest})`,
            },
        ]
    }
}
class PackageNotAvailableView {
    public readonly tag = 'a'
    public readonly target = '_blank'
    public readonly href =
        'https://github.com/youwol/cdn-externals/issues/new/choose'
    public readonly class = 'border p-2 d-flex align-items-center fv-pointer'
    public readonly style = {
        width: 'fit-content',
    }
    public readonly children: VirtualDOM[]
    constructor() {
        this.children = [
            {
                class: 'fas fa-cloud-upload-alt',
            },
            { class: 'mx-2' },
            {
                innerText: 'Request publication',
            },
        ]
    }
}
