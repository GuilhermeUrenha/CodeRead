import * as vscode from 'vscode';
import * as puppeteer from 'puppeteer';

async function getResult(input: string) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://codebeautify.org/jsviewer');
	console.log(page);
return;
	// Fill out the form with the input
	await page.type('.ace_indentifier', input);
	await page.click('#defaultActon');
	
	const result = await page.$eval('.ace_identifier', element => element.textContent);

//	// Wait for the result to be displayed
//	await page.waitForSelector('#result');
//	
//	// Extract the result from the page
//	const result = await page.$eval('#result', el => el.textContent);
	
	await browser.close();
	return result;
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
