import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./validationSchema";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import "./ModalStyle.css";
import Button from "../../FormFields/Button";
import { TransactionContextProps } from "../../../lib/TransactionProvider/TransactionProvider.types";
import { TransactionContext } from "../../../lib/TransactionProvider";
import { createId } from "@paralleldrive/cuid2";

type Schema = z.infer<typeof validationSchema>;

type UserCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddTransactionModal: React.FC<UserCreateModalProps> = (props) => {
  if (!props.open) return null;
  return (
    <Dialog.Root open={props.open}>
      <Portal {...props} />
    </Dialog.Root>
  );
};

export default AddTransactionModal;

const Portal: React.FC<UserCreateModalProps> = (props) => {
  const { state, dispatch } = React.useContext(
    TransactionContext,
  ) as TransactionContextProps;
  const form = useForm<Schema>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      service: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    dispatch({
      type: "ADD_TRANSACTION",
      value: {
        id: createId(),
        name: values.name,
        phone: values.phone,
        service: values.service,
        package: values.package,
        createdAt: new Date().toISOString(),
        amount: 0,
        status: "onProgress",
      },
    });
    form.reset();
    props.onClose();
  });

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="animate-overlayShow fixed inset-0 z-50 bg-black/75" />
      <Dialog.Content className="animate-contentShow fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] px-2 md:w-[500px]">
        <form
          className="rounded-md bg-white px-7 py-9 shadow-xl md:px-10 md:py-10"
          onSubmit={onSubmit}
        >
          <div className="absolute right-[20px] top-[20px]">
            <button
              type="button"
              className="rounded-md p-1 text-slate-700 hover:bg-rose-600/20 hover:text-rose-600"
              aria-label="Close"
              onClick={props.onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <Dialog.Title className="text-xl font-bold text-blue-600 md:text-2xl">
            Tambah Transaksi
          </Dialog.Title>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <fieldset className="mt-8 flex flex-col gap-1">
                <label className="text-xs text-slate-600 md:text-sm">
                  Nama
                </label>
                <input
                  className="w-full rounded-md border-[1px] border-slate-300 px-3 py-2 text-sm font-normal text-slate-700 outline-none placeholder:text-xs placeholder:font-normal focus:border-blue-600 md:text-base md:placeholder:text-sm"
                  placeholder="Type name here"
                  value={field.value}
                  onChange={field.onChange}
                />

                {fieldState.error && (
                  <p className="text-[9px] font-normal text-red-500 md:text-[10px]">
                    {fieldState.error.message}
                  </p>
                )}
              </fieldset>
            )}
          />
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <fieldset className="mt-5 flex flex-col gap-1">
                <label className="text-xs text-slate-600 md:text-sm">
                  No Handphone
                </label>
                <input
                  className="w-full rounded-md border-[1px] border-slate-300 px-3 py-2 text-sm font-normal text-slate-700 outline-none placeholder:text-xs placeholder:font-normal focus:border-blue-600 md:text-base md:placeholder:text-sm"
                  placeholder="Type email here"
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <p className="text-[9px] font-normal text-red-500 md:text-[10px]">
                    {fieldState.error.message}
                  </p>
                )}
              </fieldset>
            )}
          />
          <fieldset className="mt-5 flex flex-col gap-[10px]">
            <label className="text-xs text-slate-600 md:text-sm">Layanan</label>
            <Controller
              control={form.control}
              name="service"
              render={({ field }) => (
                <RadioGroup.Root
                  className="flex gap-[20px]"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {state.services.map((item, idx) => (
                    <div
                      key={item.value}
                      className="flex items-center gap-[10px]"
                    >
                      <RadioGroup.Item
                        className="RadioGroupItem bg-blue-100"
                        value={item.value}
                        id={`{r-service-${idx + 1}}`}
                      >
                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                      </RadioGroup.Item>
                      <label
                        className="text-xs font-semibold capitalize text-slate-600 md:text-sm"
                        htmlFor={`{r-service-${idx + 1}}`}
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup.Root>
              )}
            />
          </fieldset>
          <fieldset className="mt-5 flex flex-col gap-[10px]">
            <label className="text-xs text-slate-600 md:text-sm">Paket</label>
            <Controller
              control={form.control}
              name="package"
              render={({ field }) => (
                <RadioGroup.Root
                  className="flex gap-[20px]"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {state.packages.map((item, idx) => (
                    <div
                      key={item.value}
                      className="flex items-center gap-[10px]"
                    >
                      <RadioGroup.Item
                        className="RadioGroupItem bg-blue-100"
                        value={item.value}
                        id={`{r-package-${idx + 1}}`}
                      >
                        <RadioGroup.Indicator className="RadioGroupIndicator" />
                      </RadioGroup.Item>
                      <label
                        className="text-xs font-semibold capitalize text-slate-600 md:text-sm"
                        htmlFor={`{r-package-${idx + 1}}`}
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup.Root>
              )}
            />
          </fieldset>
          <div className="mt-3 flex gap-3">
            <Button className="mt-7" disabled={!form.formState.isValid}>
              <div className="transition-opacity duration-200 ease-in-out">
                Tambah
              </div>
            </Button>
            <Button className="mt-7" onClick={props.onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
