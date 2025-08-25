import { CombinedFormData, formDataModel } from "../types/types";

export async function convertCSV(jsonData: CombinedFormData[]) {
    try {
        if (!jsonData || jsonData.length === 0) {
            return '';
        }
        const headers = Object.keys(jsonData[0]);
        const csvHeader = headers.map(h => `"${h}"`).join(',');

        const csvRows = jsonData.map(row => {
            return headers.map(header => {
                let value = row[header];

                if (value === null || value === undefined) {
                    value = '';
                }

                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }

                const escapedValue = String(value).replace(/"/g, '""');
                return `"${escapedValue}"`;
            }).join(',');
        });

        return [csvHeader, ...csvRows].join('\n');
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function readJSON(path: string) {
    try {
        const file = Bun.file(path);
        const jsonData = await file.json() as formDataModel[];
        return jsonData
    } catch (error) {
        console.error(error)
        throw error;
    }
}
