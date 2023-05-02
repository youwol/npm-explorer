import { BehaviorSubject } from 'rxjs'
import { NpmSearchResponse } from './npm.models'

export class AppState {
    public readonly packages$ = new BehaviorSubject<NpmSearchResponse>({
        objects: [],
    })

    search(term: string) {
        fetch(`https://registry.npmjs.com/-/v1/search?text=${term}&size=20`)
            .then((resp) => resp.json())
            .then((d) => {
                this.packages$.next(d)
            })
    }
}
