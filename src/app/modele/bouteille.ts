export interface Bouteille {
    id?: string;
    emplacement?: string;
    appellation?: string;
    type?: string;
    couleur?: string;
    millesime?: number;
    garde?: number;
    dateConso?: number
    source?: string;
    degustation?: boolean;
    commentaire?: string;
    cepages?: string[];
    accompagnements?: string[];
    owner?: string;
    domaine?: string;
}
