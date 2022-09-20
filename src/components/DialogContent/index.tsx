import * as Dialog from '@radix-ui/react-dialog';
import { tableInfo } from '../../utils/tableInfo';

import styles from './dialogContent.module.css';

interface DialogContentProps {
  setResultIMC: number;
}

export function DialogContent({ setResultIMC }: DialogContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />

      <Dialog.Content className={styles.dialogContent}>
        <Dialog.Title className={styles.dialogTitle}>Resultado</Dialog.Title>
        <p className={styles.resultImc}>Seu IMC é de <span>{setResultIMC.toFixed(1)} kg/m²</span></p>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  Classificação
                </th>
                <th>
                  IMC
                </th>
              </tr>
            </thead>
            <tbody>
              {
                tableInfo.map(item => {
                  return (
                    <tr key={item.name} className={setResultIMC >= item.minValue && setResultIMC <= item.maxValue ? styles.resultIMCSelected : ''}>
                      <td>
                        {item.name}
                      </td>
                      <td>
                        {item.description}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <Dialog.Close type='button' className={styles.dialogCloseButton}>Calcular novamente</Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal >
  )
}