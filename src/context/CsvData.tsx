import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface CSVContextType {
  csvFile: any;
  setCsvFile: Dispatch<SetStateAction<any>>;
  csvData: any;
  setCsvData: Dispatch<SetStateAction<any>>;
  csvMeta: string[];
  setCsvMeta: Dispatch<SetStateAction<string[]>>;
  chartData: string[];
  setChartData: Dispatch<SetStateAction<string[]>>;
  xLabels: any;
  setXLabels: Dispatch<SetStateAction<any>>;
}

const CSVContext = createContext<CSVContextType | null>(null);

export const useCsvContext = () => {
  const context = useContext(CSVContext);
  if (!context) throw new Error('useCsvContext must be within the Provider');
  return context;
};

export const CsvDataProvider = (props: PropsWithChildren) => {
  const [csvData, setCsvData] = useState<any>();
  const [csvMeta, setCsvMeta] = useState<string[]>([]);
  const [csvFile, setCsvFile] = useState<any>();
  const [chartData, setChartData] = useState<string[]>([]);
  const [xLabels, setXLabels] = useState<any>();

  const value: CSVContextType = {
    csvData,
    setCsvData,
    csvMeta,
    setCsvMeta,
    csvFile,
    setCsvFile,
    chartData,
    setChartData,
    xLabels,
    setXLabels,
  };
  return (
    <CSVContext.Provider value={value}>{props.children}</CSVContext.Provider>
  );
};
