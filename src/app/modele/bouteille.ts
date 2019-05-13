export interface Bouteille {
    id?: string;
    emplacement?: string;
    appellation?: string;
    type?: string;
    couleur?: string;
    millesime?: number;
    garde?: number;
    source?: string;
    degustation?: boolean;
    commentaire?: string;
    ceppages?: string[];
    accompagnements?: string[];
    owner?: string;
}
