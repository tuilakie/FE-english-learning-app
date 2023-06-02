import { Button, Checkbox, Table, Tag, Typography } from "antd";
import { Word } from "../../redux/api/types";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

type Props = {
  data: Word[];
};

const columns: ColumnsType<Word> = [
  {
    title: "Word",
    dataIndex: "word",
    key: "word",
    render: (word: string) => (
      <Typography.Title level={5}>{word}</Typography.Title>
    ),
  },
  {
    title: "IPA",
    dataIndex: "ipa",
    key: "ipa",
    render: (ipa: string) => (
      <Typography.Text keyboard strong style={{ fontSize: "1rem" }}>
        {ipa}
      </Typography.Text>
    ),
  },
  {
    title: "Meaning",
    dataIndex: "meaning",
    key: "meaning",
    render: (meaning: string) => (
      <Typography.Text strong>{meaning}</Typography.Text>
    ),
  },
  {
    title: "Learned",
    dataIndex: "learned",
    key: "learned",
    filters: [
      { text: "Learned", value: true },
      { text: "Not learned", value: false },
    ],
    onFilter: (value, record) => record.learned === value,
    render: (learned: boolean) => (
      <>
        {learned ? (
          <Tag color="green">Learned</Tag>
        ) : (
          <Tag color="red">Not learned</Tag>
        )}
      </>
    ),
  },
];

const ignoreModeColumns: ColumnsType<Word> = [
  {
    title: "Word",
    dataIndex: "word",
    key: "word",
    render: (word: string) => (
      <Typography.Title ellipsis level={5}>
        {word}
      </Typography.Title>
    ),
  },
  {
    title: "IPA",
    dataIndex: "ipa",
    key: "ipa",
    render: (ipa: string) => (
      <Typography.Text ellipsis keyboard strong style={{ fontSize: "1rem" }}>
        {ipa}
      </Typography.Text>
    ),
  },
  {
    title: "Meaning",
    dataIndex: "meaning",
    key: "meaning",
    render: (meaning: string) => (
      <Typography.Text ellipsis strong>
        {meaning}
      </Typography.Text>
    ),
  },
  Table.SELECTION_COLUMN,
];

const WordList = ({ data }: Props) => {
  const [ignoreMode, setIgnoreMode] = useState(false);

  return (
    <Table
      title={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {!ignoreMode && (
            <>
              <Typography.Text
                strong
                type="warning"
                italic
                style={{ fontSize: 24 }}
              >
                if you already know this word, you can ignore it !!
              </Typography.Text>
              <Button type="primary" danger onClick={() => setIgnoreMode(true)}>
                Ignore
              </Button>
            </>
          )}
        </div>
      )}
      footer={() => (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          {ignoreMode && (
            <>
              <Button
                type="primary"
                danger
                onClick={() => setIgnoreMode(false)}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={() => setIgnoreMode(false)}>
                Save
              </Button>
            </>
          )}
        </div>
      )}
      dataSource={
        ignoreMode
          ? data
              .filter((word) => !word.learned)
              .map((word) => ({ ...word, ignore: false }))
          : data
      }
      columns={ignoreMode ? ignoreModeColumns : columns}
      rowKey={(record) => record.id}
      rowSelection={
        ignoreMode
          ? {
              type: "checkbox",
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys, selectedRows);
              },
              columnWidth: 100,
            }
          : undefined
      }
      pagination={false}
    />
  );
};

export default WordList;
