import { ulid } from "ulid";

export const generateCompanyId = () =>
    `cmp_${ulid()}`;

export const generateProductId = () =>
    `prd_${ulid()}`;

export const generatePlaylistId = () =>
    `ply_${ulid()}`;

export const generateHostId = () =>
    `hst_${ulid()}`;

export const generateCategoryId = () =>
    `cat_${ulid()}`;

export const generateSubscriptionId = () =>
    `sub_${ulid()}`;

export const generatePaymentId = () =>
    `pay_${ulid()}`;

export const generateMembershipId = () =>
    `mem_${ulid()}`;

export const generateActivityId = () =>
    `log_${ulid()}`;