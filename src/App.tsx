import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';

import * as Dialog from '@radix-ui/react-dialog'
import { Input } from './components/Input';

import styles from './App.module.css';
import { DialogContent } from './components/DialogContent';

interface IMCData {
  weight: string;
  height: string;
}

function App() {
  const { handleSubmit, register, reset, control } = useForm<IMCData>({
    defaultValues: {
      height: '',
      weight: ''
    }
  });
  const { errors, isSubmitSuccessful } = useFormState({ control });

  const [resultImc, setResultImc] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState(isSubmitSuccessful);

  function handleCalculeImc(data: IMCData) {
    const resultIMC = Number(data.weight) / (Number(data.height) * Number(data.height));
    setResultImc(resultIMC)
    setOpenDialog(!openDialog);
    reset();
  }

  return (
    <div className={styles.container}>

      <form onSubmit={handleSubmit(handleCalculeImc)} className={styles.formContainer}>
        <h1 className={styles.title}>Calculadora IMC</h1>

        <Input
          label='Altura'
          type="number"
          step={.01}
          placeholder='1,70m'
          errorMesssage={errors.height?.message}
          {...register('height', {
            required: 'Informe a sua altura',
            pattern: {
              value: /^[0-2][\.,]\d{2}|[0-2][\.,]\d{1}$/,
              message: "Infome a sua altura Ex.: 1,83m"
            }
          })}
        />

        <Input
          label='Peso'
          type="number"
          step={.01}
          placeholder='78,7kg'
          errorMesssage={errors.weight?.message}
          {...register('weight', {
            required: 'Informe o seu peso',
            pattern: {
              value: /^([1-9][0-9][\.,](\d{2}|\d{1})|[1-9][0-9][0-9]|[1-9][0-9]|[1-9]|[1-9][0-9][0-9][\.,](\d{2}|\d{1}))$/,
              message: "Infome o seu peso Ex.: 78,83kg"
            }
          })}
        />
        <button type='submit' className={styles.button}>Calcular</button>
      </form>
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          setResultIMC={resultImc}
        />
      </Dialog.Root>
    </div >
  )
}

export default App
