import * as vscode from 'vscode';
import * as puppeteer from 'puppeteer';

async function getResult(input: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://codebeautify.org/jsviewer');
	await page.type('.ace_content', input);
	
    var textContent:(string|null); //[]
	textContent = (await page.$$eval('.ace_content', elements => { return elements.map(e => e.textContent); }))[1];
	//divContent = await page.$$eval('.ace_identifier', elements => { return elements.map(e => e.textContent); }); //div#outputACEEditor >
	console.log(textContent);

	await browser.close();
	return textContent;
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Code Read active.');
	let disposable = vscode.commands.registerCommand('coderead.codeRead', () => {
		getResult('');
		var language = vscode.window.activeTextEditor?.document.languageId ?? 'Null';
		language = language?.charAt(0).toLocaleUpperCase()+language?.slice(1);
		vscode.window.showInformationMessage(`Code Read: ${language}`);
	});
	context.subscriptions.push(disposable);

	vscode.languages.registerDocumentFormattingEditProvider('javascript', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			var textEdit: vscode.TextEdit[] = [];
		  	const firstLine = document.lineAt(0);
			const language = document.languageId?.charAt(0).toLocaleUpperCase()+document.languageId?.slice(1);
			const lineInsert = `// ${language}`;
			//const textContent = getResult(document.getText());
			if (firstLine.text !== lineInsert) {
				textEdit = [vscode.TextEdit.insert(firstLine.range.start, lineInsert+'\n')];
			}
			return textEdit;
		}
	});
	
	vscode.languages.registerDocumentFormattingEditProvider('csharp', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			var textEdit: vscode.TextEdit[] = [];
		  	const firstLine = document.lineAt(0);
			const language = document.languageId?.charAt(0).toLocaleUpperCase()+document.languageId?.slice(1);
			const lineInsert = `// ${language}`;
			//const textContent = getResult(document.getText());
			if (firstLine.text !== lineInsert) {
				textEdit = [vscode.TextEdit.insert(firstLine.range.start, lineInsert+'\n')];
			}
			return textEdit;
		}
	});
}

export function deactivate() {}
